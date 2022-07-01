import React from 'react'
import s from './DemoSectionTemplate.module.css'

const DemoSectionTemplate: React.FC<DemoSectionTemplatePropsType> = (props) => {
    return (
        <div className={s.section}>
            <h2>{props.title}</h2>

            <div>{props.children}</div>
        </div>
    )
}

export default DemoSectionTemplate

type DemoSectionTemplatePropsType = {
    title: string
    children: React.ReactNode
}