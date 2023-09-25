import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextEditor = ({value, onChange}) => {
    const editorConfiguration = {
        toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote']
    };
    return <>
        <CKEditor
            config={editorConfiguration}
            editor={ClassicEditor}
            data={value ?? ''}
            onChange={(event, editor) => onChange(editor.getData())}
        />
    </>
}

export default TextEditor;