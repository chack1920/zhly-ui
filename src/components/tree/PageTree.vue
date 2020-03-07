<script lang="ts">
    import { getModule } from 'vuex-module-decorators';
    import TreeNodeStore from '@/store/modules/design/TreeNodeStore';
    import store from '@/store';
    import * as Config from '../../../package.json';
    const treeNodeStore = getModule(TreeNodeStore, store);
    import PagesStore from '@/store/modules/design/PagesStore';
    const pagesStore = getModule(PagesStore, store);

    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class PageTree extends Vue {

        private treeData : Array<any>;
        private buttonProps : any;
        private showConfirmDialog = false;
        private confirmTitle = '';
        private confirmContent = '';
        private canCloseDirDialog = true;
        private canClosePageDialog = true;
        private loading = true;
        private form : any;
        private dirValidateRules : any;
        private pageValidateRules : any;

        constructor() {
            super()
            treeNodeStore.load(null);
            let treeNode = this.loadTreeNode(this.$store.state.TreeNodeStore.info, null);
            this.treeData = new Array(treeNode);
            this.buttonProps = {
                type: 'default',
                    size: 'small',
            }
            this.showConfirmDialog = false;
            this.confirmTitle = '';
            this.confirmContent = '';
            this.canCloseDirDialog = true;
            this.canClosePageDialog = true;
            this.loading = true;
            this.form = {
                filename: ''
            }

            this.dirValidateRules = {
                filename: [
                    { required: true, message: '目录名称不能为空', trigger: 'blur' },
                    { max: 20, message: '不能超过20个字符', trigger: 'blur' },
                    { type: 'string', message: '只允许输入中英文、数字或下划线', pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, trigger: 'blur' }
                ]
            }

            this.pageValidateRules = {
                filename: [
                    { required: true, message: '网页名称不能为空', trigger: 'blur' },
                    { max: 20, message: '不能超过20个字符', trigger: 'blur' },
                    { type: 'string', message: '只允许输入中英文、数字或下划线', pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, trigger: 'blur' }
                ]
            }
        }

        ok() {
            this.action();
        }
        cancel() {}
        action() {}
        loadTreeNode(sourceData, treeNode) {

            if(!sourceData) {
                return null;
            }

            if(!treeNode) {
                treeNode = {
                    title: sourceData.name,
                    expand: true,
                    path: (<any>Config).root + '/localhost',
                    selected: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                cursor: "pointer",
                                color: node.node.selected ? "#2d8cf0" : "#fff" //根据选中状态设置样式
                            },
                            on: {
                                click: () => {
                                    if (!node.node.selected) {
                                        (<any>this.$refs).tree.handleSelect(node.nodeKey); //手动选择树节点
                                        treeNodeStore.select(data.path);
                                    }
                                }
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'md-desktop'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', data.title)
                            ])
                        ]);
                    }
                };
            }

            else {
                treeNode.title = sourceData.name,
                    treeNode.path = sourceData.path,
                    treeNode.expand = false;
                treeNode.type = sourceData.type;
            }

            if(sourceData.children && sourceData.children.length > 0) {
                if(!treeNode.children) {
                    treeNode.children = new Array();
                }
                for(var i=0; i<sourceData.children.length; i++) {
                    let childNode = this.loadTreeNode(sourceData.children[i], {});
                    if(childNode) {
                        treeNode.children.push(childNode);
                    }
                }
            }

            return treeNode;
        }

        renderContent (h, { root, node, data }) {

            return h('span', {
                style: {
                    display: "grid",
                    cursor: "pointer",
                    width: 'auto',
                    marginRight: '0px',
                    marginLeft: '0px',
                    color: node.node.selected ? "#2d8cf0" : "#fff" //根据选中状态设置样式
                },
                on: {
                    click: () => {
                        if (!node.node.selected) {
                            (<any>this.$refs).tree.handleSelect(node.nodeKey); //手动选择树节点
                        }
                        treeNodeStore.select(data.path);
                    },
                    dblclick: ()=> {
                        if(data.type == 'folder') {
                            data.expand = true;
                            return;
                        }

                        if(data.type == 'file') {
                            let pageInfo = this.$store.state.TreeNodeStore.currentPageInfo;
                            for(let i in this.$store.state.PagesStore.pages) {
                                if(!this.$store.state.PagesStore.pages[i]) {
                                    continue;
                                }

                                this.$store.state.PagesStore.currentTab = '';
                            }

                            let page = this.$store.state.PagesStore.pages.find(a=>a.path == pageInfo.path);
                            if(page) {
                                this.$store.state.PagesStore.currentTab = page.path;
                                return;
                            }

                            this.$store.state.PagesStore.currentTab = pageInfo.path;
                            this.$store.state.PagesStore.pages.push(pageInfo);
                        }
                    }
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: data.type==='folder' ? 'ios-folder-outline' : 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: node.node.selected ? 'inline-block' : 'none',
                        float: 'right',
                        marginRight: '5px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-add',
                            type: 'primary',
                            shape: 'circle',
                            title: '新建'
                        }),
                        style: {
                            marginRight: '8px',
                            width: '16px',
                            height: '16px',
                            fontSize: '11px',
                            lineHeight: '11px',
                            display: 'none',
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-remove',
                            type: 'primary',
                            shape: 'circle',
                            title: '删除'
                        }),
                        style: {
                            width: '16px',
                            height: '16px',
                            fontSize: '11px',
                            lineHeight: '11px',
                        },
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        }

        append (data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        }

        remove(root, node, data) {
            this.showConfirmDialog = true;
            let typeString = (data.type=='file' ? '文件' : '目录');
            this.confirmTitle = '删除' + typeString;
            this.confirmContent = '您确定要删除' + typeString + '[' + data.title + ']吗？';
            this.action = ()=>{

                treeNodeStore.removeSelected();
                pagesStore.remove(data.path);
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);

                (<any>this.$refs).tree.handleSelect(parentKey); //手动选择树节点
                treeNodeStore.select(parent.path);
                this.$Message.success(typeString + '删除成功');
            }
        }

        openDirDialog () {
            this.canCloseDirDialog = true;
            this.$store.state.TreeNodeStore.showDirDialog = true;
        }

        openPageDialog () {
            this.canClosePageDialog = true;
            this.$store.state.TreeNodeStore.showPageDialog = true;
        }

        closeDialog() {
            this.$store.state.TreeNodeStore.showPageDialog = false;
            this.$store.state.TreeNodeStore.showDirDialog = false;
        }

        createDir() {
            (<any>this.$refs['form']).validate((valid)=> {
                this.$store.state.TreeNodeStore.showDirDialog = false;
                if (!valid) {
                    this.loading = false;
                    this.canCloseDirDialog = false;
                    this.$store.state.TreeNodeStore.showDirDialog = true;
                    this.$Message.warning('目录名称不合法');
                    return;
                }

                let olddir = this.$store.state.TreeNodeStore.currentDirInfo;
                this.$store.commit('TreeNodeStore/addDir', this.form.filename);
                let newdir = this.$store.state.TreeNodeStore.currentDirInfo;

                let findNodeFn = (path, data)=> {

                    if(!data) {
                        return false;
                    }
                    for(let i in data) {
                        if(data[i].path == path) {
                            return data[i];
                        }

                        let node = findNodeFn(path, data[i].children)
                        if(node) {
                            return node;
                        }
                    }
                }

                let node: any = findNodeFn(olddir.path, this.treeData);
                if(!node) {
                    this.$Message.error('当前选中目录无效');
                    return false;
                }

                let children = node.children;
                if(!children) {
                    children = new Array();
                }

                children.push({
                    title: newdir.name,
                    expand: false,
                    path: newdir.path,
                    type: newdir.type,
                    selected: true,
                });

                this.$set(node, 'children', children);
                node.selected = false;
                node.expand = true;

                this.loading = true;
                this.form.filename = '';
                this.resetFields();
                this.$Message.success('操作成功');
            })
        }

        createPage() {
            (<any>this.$refs['form']).validate((valid)=> {
                this.$store.state.TreeNodeStore.showPageDialog = false;
                if (!valid) {
                    this.loading = false;
                    this.canClosePageDialog = false;
                    this.$store.state.TreeNodeStore.showPageDialog = true;
                    this.$Message.error('操作失败');
                    return;
                }

                this.$store.commit('TreeNodeStore/addPage', this.form.filename);


                let findNodeFn = (path, data)=> {

                    if(!data) {
                        return false;
                    }
                    for(let i in data) {
                        if(data[i].path == path) {
                            return data[i];
                        }

                        let node = findNodeFn(path, data[i].children)
                        if(node) {
                            return node;
                        }
                    }
                }

                let node: any = findNodeFn(this.$store.state.TreeNodeStore.currentDirInfo.path, this.treeData);
                if(!node) {
                    this.$Message.error('当前选中目录无效');
                    return false;
                }

                let children = node.children;
                if(!children) {
                    children = new Array();
                }

                for(let i in children) {
                    children[i].selected = false;
                }

                let page = this.$store.state.TreeNodeStore.currentPageInfo;
                children.push({
                    title: page.name,
                    path: page.path,
                    type: page.type,
                    selected: true,
                });

                this.$set(node, 'children', children);
                node.selected = false;
                node.expand = true;

                this.loading = true;
                this.form.filename = '';
                this.resetFields();
                this.$Message.success('操作成功');
            })
        }

        resetFields() {
            try {
                (<any>this.$refs['form']).resetFields();
            } catch(e) {}
        }
    }
</script>

<template lang="pug" src="@/views/tree/pagetree.pug" />
<style scoped src="@/styles/tree/pagetree.css" />
