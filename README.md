# tools

一个工具库

## Type

> 类型检查

| Name        | Type   | Return  | Description           |
| :---------- | :----- | :------ | :-------------------- |
| getType     | any    | string  | 返回参数的类型        |
| isType      | String | Boolean | 判断是否是指定`Type`  |
| isNull      | any    | Boolean | 判断是否是`Null`      |
| isUndefined | any    | Boolean | 判断是否是`Undefined` |
| isArray     | any    | Boolean | 判断是否是`Array`     |
| isObject    | any    | Boolean | 判断是否是`Object`    |
| isNumber    | any    | Boolean | 判断是否是`Number`    |
| isString    | any    | Boolean | 判断是否是`String`    |
| isFunc      | any    | Boolean | 判断是否是`Function`  |
| isDate      | any    | Boolean | 判断是否是`Date`      |
| isError     | any    | Boolean | 判断是否是`Error`     |
| isRegExp    | any    | Boolean | 判断是否是`RegExp`    |
| isMap       | any    | Boolean | 判断是否是`Map`       |
| isSet       | any    | Boolean | 判断是否是`Set`       |
| isSymbol    | any    | Boolean | 判断是否是`Symbol`    |
| isPromise   | any    | Boolean | 判断是否是`Promise`   |
| isNan       | any    | Boolean | 判断是否是`Nan`       |

## Value

> 有关值操作

| Name     | Type         | Return  | Description                |
| :------- | :----------- | :------ | :------------------------- |
| isEmpty  | any          | Boolean | 是否为空值                 |
| toUnique | Array \| Set | Array   | 去重                       |
| checkNum | String       | String  | 校验数值字符串，并且格式化 |

## Request

> 请求封装

| Name    | Type   | Return | Description |
| :------ | :----- | :----- | :---------- |
| request | Object | Null   | 请求        |

## Browser

> 浏览器

| Name           | Type                                       | Return | Description    |
| :------------- | :----------------------------------------- | :----- | :------------- |
| buildScheme    | Object                                     | String | 创建 `Scheme`  |
| generateIntent | (config: Object, Option: Object) => String | String | 创建 `Intent`  |
| getBrowser     | Null                                       | Object | 判断浏览器类型 |

## Dom

| Name             | Type                                                 | Return                 | Description    |
| :--------------- | :--------------------------------------------------- | :--------------------- | :------------- |
| addEventListener | (dom, eventType, cb, option) => {remove: () => void} | { remove: () => void } | 注册事件       |
| getParent        | (dom, target: String \| Element) => null             | Element \| null        | 获取指定父元素 |

## UUID

| Name    | Type | Return | Description |
| :------ | :--- | :----- | :---------- |
| shortID | Null | String | 生成 UUID   |

## Debounce

| Name     | Type                                | Return   | Description |
| :------- | :---------------------------------- | :------- | :---------- |
| debounce | (func, wait, immediate) => Function | Function | 防抖        |

## Throttle

| Name     | Type                     | Return   | Description |
| :------- | :----------------------- | :------- | :---------- |
| throttle | (func, wait) => Function | Function | 节流        |
