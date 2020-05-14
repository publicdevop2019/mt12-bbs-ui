import { FileImageFilled } from '@ant-design/icons';
import React, { useMemo, useRef } from 'react';
import { createEditor, Transforms } from 'slate';
import { Editable, Slate, useEditor, useFocused, useSelected, withReact } from 'slate-react';
import { HttpClient } from '../http/http-client';
interface IProp {
    value: any,
    setValue?: (value: any) => void,
}
export const RichTextEditor = (props: IProp) => {
    const editor = useMemo(() => withImages(withReact(createEditor())), [])

    return (
        <Slate editor={editor} value={props.value} onChange={value => (typeof props.setValue === "function") && props.setValue(value)}>
            {
                typeof props.setValue === "function" ?
                    <div id="tool-bar" style={{ marginBottom: '4px' }}>
                        <InsertImageButton />
                    </div>
                    :
                    null
            }

            <div style={{ border: '1px solid #d9d9d9' }}>
                <Editable
                    renderElement={props => <Element {...props} />}
                    placeholder="Enter something here..."
                    readOnly={typeof props.setValue !== "function"}
                />
            </div>
        </Slate>
    )
}

const withImages = (editor: any) => {
    const { isVoid } = editor
    editor.isVoid = (element: any) => {
        return element.type === 'image' ? true : isVoid(element)
    }
    return editor
}

const insertImage = (editor: any, url: string, alt: string) => {
    const image = { type: 'image', url, alt, children: [{ text: '' }] }
    const text = {
        type: 'paragraph',
        children: [
            {
                text:
                    '',
            },
        ],
    }
    Transforms.insertNodes(editor, image)
    Transforms.insertNodes(editor, text)
}

const Element = (props: any) => {
    const { attributes, children, element } = props

    switch (element.type) {
        case 'image':
            return <ImageElement {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

const ImageElement = (props: any) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <>
            <div {...props.attributes}>
                <div contentEditable={false}>
                    <img
                        src={props.element.url} alt={props.element.alt}
                        style={{ display: 'block', maxWidth: '100%', maxHeight: '20em', boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none' }}
                    />
                </div>
                {props.children}
            </div>
        </>
    )
}

const InsertImageButton = () => {
    const editor = useEditor();
    const inputRef: any = useRef();
    return (
        <>
            <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                    const fileName = e.target.files![0].name;
                    HttpClient.uploadImage(e.target.files[0]).then(next => {
                        inputRef.current.value = ''
                        insertImage(editor, next, fileName)
                    })
                }
            }}></input>
            <FileImageFilled style={{ fontSize: '24px', textAlign: 'left' }} onClick={() => { inputRef.current.click() }} />
        </>
    )
}

