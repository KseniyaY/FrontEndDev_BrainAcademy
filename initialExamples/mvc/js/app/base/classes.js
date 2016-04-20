define(['utils/object'], function (objUtils) {
    var clsObj = {
        blog: {
            newPost: 'newpost', 
            newPostHead: 'newpost_input_head', 
            newPostBody: 'newpost_input_body',
            newPostButton: 'newpost-button'
        },
        post: {
            header: "post_header-content",
            body: "post_body",
            body_add: "col-md-4 post",
            toggle: "post_toggle",
            headerWrap: "post_header",
            delButton: "post_delete",
            bsbtn: 'btn btn-danger',
            bsin: 'form-control',
            commentAddBtn: 'btn btn-default',
            bodyWrap: "post_body-wrap",
            bodyWrapHidden: "hidden",
            commentsBlock: "post_comments",
            commentsNew: "post_newcomment form-inline",
            commentNewCreate:  "post_newcomment-create",
            commentNewTitle:  "post_newcomment-title",
            commentNewInput:  "post_newcomment-input"
        },
        comment: {
            body: "comment_body",
            btn: "comment_del",            
            bsbtn: 'btn btn-danger btn-xs',
            comment: 'comment'
        }
    }

    return function (moduleName) {
        return objUtils.deepCopy(clsObj[moduleName]);
    }
});
    