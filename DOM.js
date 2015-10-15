/**
 * Created by cataway on 2015/10/15.
 */
var utils={};
/*
 * getChildren：Gets all of the elements of the specified tag name node (gets all the elements of the sub section, we can filter out the tag name of the element).
 * @parameter
 *   curEle：[object] Current elements to be operated
 *   tagName：[string] Tag name
 * @return：[Array] Gets the collection of elements of the specified tag name
 */
utils.getChildren = function (curEle, tagName) {
    var ary = [], nodes = curEle.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        var cur = nodes[i];
        if (cur.nodeType === 1) {
            var curN = cur.nodeName.toLowerCase(), tarN = tagName.toLowerCase();
            if (typeof tagName === "string" && curN === tarN) {
                ary.push(cur);
                continue;
            }
            ary.push(cur);
        }
    }
    return ary;
};

//getPre：Get on a brother element node
utils.getPre = function (curEle) {
    if (curEle.previousElementSibling) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
};

//getNext：Gets the next younger brother element node
utils.getNext = function (curEle) {
    if (curEle.nextElementSibling) {
        return curEle.nextElementSibling;
    }
    var next = curEle.nextSibling;
    while (next && next.nodeType !== 1) {
        next = next.nextSibling;
    }
    return next;
};

//getSibling：Gets the two sibling elements from the adjacent
utils.getSibling = function (curEle) {
    var pre = this.getPre(curEle);
    var next = this.getNext(curEle);
    var ary = [];
    pre ? ary.push(pre) : void 0;
    next ? ary.push(next) : void 0;
    return ary;
};

//getPres：Gets all the older brother element nodes
utils.getPres = function (curEle) {
    var ary = [];
    var pre = this.getPre(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = this.getPre(pre);
    }
    return ary;
};

//getNexts：Gets all the younger brother element nodes
utils.getNexts = function (curEle) {
    var ary = [], next = this.getNext(curEle);
    while (next) {
        ary.push(next);
        next = this.getNext(next);
    }
    return ary;
};

//getSiblings：Gets all the sibling nodes
utils.getSiblings = function (curEle) {
    return this.getPres(curEle).concat(this.getNexts(curEle));
};

//getIndex：Gets the index of the current element
utils.getIndex = function (curEle) {
    return this.getPres(curEle).length;
};

//getFirst：Gets the first element child node
utils.getFirst = function (curEle, tagName) {
    var children = this.getChildren(curEle, tagName);
    return children.length > 0 ? children[0] : null;
};

//getLast：Gets the last element child node
utils.getLast = function (curEle, tagName) {
    var children = this.getChildren(curEle, tagName);
    return children.length > 0 ? children[children.length - 1] : null;
};