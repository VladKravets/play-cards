import React from 'react'
import s from "./About.module.css"
import aboutImage from "../../assets/images/aboutLearn.png"
import {useNavigate} from "react-router-dom";
import {PATH} from "../../utils/path";


export const About = () => {
    const navigate = useNavigate()

    const learnNowHandler = () => {
        navigate(PATH.packsList)
    }
    return (
        <div className={s.wrapper}>
            <h1 className={s.aboutTitle}>On <span className={s.grayTitle}>Flash<span className={s.purpleTitle}> C</span>ards you</span> can
                create, manage and learn flashcards for free.</h1>
            <div className={s.infoBlock}>
                <div className={s.leftBlock}>
                    <h2>Create your own<span className={s.purpleTitle}> learning cards</span> or copy them publicly.</h2>
                    <h2>Various <span className={s.purpleTitle}>learning modes</span>, e.g. the proven <span
                        className={s.purpleTitle}>spaced learning system</span></h2>
                </div>
                <div className={s.imageBlock}>
                    <img className={s.aboutImage} src={aboutImage} alt=""/>
                    <h2>Create<span className={s.purpleTitle}> flashcard texts</span> in any <span
                        className={s.purpleTitle}>format</span> and <span
                        className={s.purpleTitle}>add images.</span></h2>
                </div>
                <div className={s.rightBlock}>
                    <h2>Targeted learning according to<span className={s.purpleTitle}> Leitner System</span></h2>
                    <h2><span className={s.purpleTitle}>Create learning groups</span> and share flashcards.</h2>
                </div>
            </div>
                <a className={s.buttonLearn} onClick={learnNowHandler}>Learn now🚀</a>
        </div>
    )
}