define(function (objUtils) {
var tplObj = {
        blog: '<div{{cls:container}}>\
                    <div{{cls:postblock}}></div>\
                    <div{{cls:newPost}}>\
                        <input type="text"{{cls:newPostHead}}>\
                        <input type="text"{{cls:newPostBody}}>\
                        <button{{cls:newPostButton}}>Create</button>\
                    </div>\
                </div>',
        post: '<div{{cls:body_add}}> \
                <div{{cls:headerWrap}}>\
                    <div{{cls:toggle}}> + </div> \
                    <span{{cls:header}}></span>\
                    <button{{cls:delButton bsbtn}}>Delete</button>\
                </div>\
                <div{{cls:bodyWrap bodyWrapHidden}}>\
                    <div{{cls:body}} contenteditable></div>\
                    <div{{cls:commentsBlock}}></div>\
                    <div{{cls:commentsNew}}>\
                        <span{{cls:commentNewTitle}}>Add Comment:</span>\
                        <input type="text"{{cls:commentNewInput bsin}}>\
                        <button{{cls:commentNewCreate commentAddBtn}}>Add</button>\
                    </div>\
                </div>\
            </div>',
        comment: '<div{{cls:comment}}><div{{cls:body}}></div><button{{cls:btn bsbtn}}>Delete</button></div>'        
    }

    return function (moduleName) {
        return tplObj[moduleName];
    }
});