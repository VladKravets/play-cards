import React from 'react'
import { MainLogo } from '../../main/ui/common/MainLogo/MainLogo'
import Spinner from '../../main/ui/common/Spinner/Spinner'
import { DeferredTextInputDemo } from './DeferredTextInputDemo/DeferredTextInputDemo'
import DemoSectionTemplate from './DemoSectionTemplate'
import DoubleRangeDemo from './DoubleRangeDemo/DoubleRangeDemo'
import EditableTextLineDemo from './EditableTextLineDemo/EditableTextLineDemo'
import { FlatProgressDemo } from './FlatProgressDemo/FlatProgressDemo'
import { FlyingRocketDemo } from './FlyingRocketDemo/FlyingRocketDemo'
import ModalWindowDemo from './ModalWindowDemo/ModalWindowDemo'
import PaginatorDemo from './PaginatorDemo/PaginatorDemo'
import { SuperAlertDemo } from './SuperAlertDemo/SuperAlertDemo'
import SuperButtonDemo from './SuperButtonDemo/SuperButtonDemo'
import SuperCheckboxDemo from './SuperCheckboxDemo/SuperCheckboxDemo'
import SuperInputTextDemo from './SuperInputTextDemo/SuperInputTextDemo'
import SuperRadioDemo from './SuperRadioDemo/SuperRadioDemo'

const commonComponents = [
    {component: <SuperButtonDemo/>, name: "<SuperButton/>"},
    {component: <SuperInputTextDemo/>, name: "<SuperInputText/>"},
    {component: <SuperCheckboxDemo/>, name: "<SuperCheckbox/>"},
    {component: <ModalWindowDemo/>, name: "<ModalWindow/>"},
    {component: <EditableTextLineDemo/>, name: "<EditableTextLine/>"},
    {component: <Spinner/>, name: "<Spinner/>"},
    {component: <FlatProgressDemo />, name: "<FlatProgress/>"},
    {component: <DoubleRangeDemo/>, name: "<DoubleRange/>"},
    {component: <PaginatorDemo/>, name: "<Paginator/>"},
    {component: <SuperRadioDemo/>, name: "<SuperRadio/>"},
    {component: <FlyingRocketDemo/>, name: "<FlyingRocket/>"},
    {component: <MainLogo/>, name: "<MainLogo/>"},
    {component: <DeferredTextInputDemo />, name: "<DeferredTextInput/>"},
    {component: <SuperAlertDemo />, name: "<SuperAlert/>"},
]

const ComponentsDemo = () => {

    return (
        <div>

            {commonComponents.map((el) => <DemoSectionTemplate key={el.name} title={el.name}>{el.component}</DemoSectionTemplate>)}

        </div>
    )
}


export default ComponentsDemo
