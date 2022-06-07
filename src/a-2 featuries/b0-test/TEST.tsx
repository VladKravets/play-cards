import React from 'react';
import SuperInputText from "../../a-1 main/f1-UI/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../a-1 main/f1-UI/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../a-1 main/f1-UI/common/c3-SuperCheckbox/SuperCheckbox";

const Test = () => {
    return (
        <div style={{display:'flex',}}>
            <SuperInputText placeholder={'test test test'}/>
            <SuperButton>TEST</SuperButton>
            <SuperCheckbox/>
        </div>
    );
};

export default Test;
