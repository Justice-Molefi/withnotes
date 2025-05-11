'use client';

import { useState } from "react";
import { Editor, EditorProvider, BtnBold, BtnItalic,BtnBulletList, BtnStyles,BtnUnderline, BtnClearFormatting, Toolbar } from "react-simple-wysiwyg";

//https://github.com/megahertz/react-simple-wysiwyg#readme

const Notes = () => {
    const content = "My name is this fucking editor shit is pissing me offfff!!!";
    const [value, setValue ] = useState('Write notes here...');

    function onChange(e: any){
        setValue(e.target.value);
    }

    return (
        <EditorProvider>
            <Editor value={value} onChange={onChange}>
                <Toolbar>
                   <BtnBold />
                   <BtnItalic />
                   <BtnBulletList/>
                   <BtnStyles />
                   <BtnUnderline />
                   <BtnClearFormatting />
                </Toolbar>
            </Editor>
        </EditorProvider>
    );
};

export default Notes;