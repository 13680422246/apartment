# 基于 antd 封装 table 组件

# 使用的属性

## 可编译的

-   editable: true：表示该列可以编辑
-   inputType: ['text','number','image'] ; 输入类型
-   dataIndex = 'edit'：为编辑列
-   rules = []：编辑的时候的输入规则
-   handleSave: function ; 自定义的处理函数

## 删除

-   dataIndex = 'delete': 为删除列

## 搜索

-   search=true：当前列存在搜索行为

## 支持自定义渲染列对象

-   render: 也是 table 自带的
