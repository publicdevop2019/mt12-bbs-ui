import React, { Component } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export class RichTextEditor extends Component<any, any>{
    render() {
        return (
            <CKEditor
                editor={ClassicEditor}
                // config={editorConfiguration}
                onInit={(editor: any) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                config={{
                    ckfinder:{uploadUrl: "http://localhost:8111/file-upload"}
                 }}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event: any, editor: any) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event: any, editor: any) => {
                    console.log('Focus.', editor);
                }}
            />
        );
    }
}