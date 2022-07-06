import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './AuthBlock.module.css'

/** Authorization block common template (set different props and different forms as children) */
const AuthBlock: FC<AuthBlockPropsType> = ({
pageTitle, children, navBlockLabel, navLinkPath, navLinkTitle}) => {

    const withNavBlock = (navLinkPath && navLinkTitle)

    return (
        <div className={s.authBlock}>
            <h1 className={s.mainLogo}>Flash cards</h1>
            <h2 className={s.pageTitle}>
                {pageTitle}
            </h2>

            {children}

            {withNavBlock &&
                <div className={s.navigationBlock}>

                    {navBlockLabel 
                        && <span className={s.navBlockLabel}>{navBlockLabel}</span>
                    }
                    <NavLink to={navLinkPath} className={s.navBlockLink}>
                        {navLinkTitle}
                    </NavLink>

                </div>
            }
        </div>
    )
}

export default AuthBlock


type AuthBlockPropsType = {
    pageTitle: string
    children: React.ReactNode
    /** Works only if navLinkPath & navLinkTitle props defined */
    navBlockLabel?: string
    /** Works only if navBlockLabel & navLinkTitle props defined */
    navLinkPath?: string
    /** Works only if navBlockLabel & navLinkPath props defined */
    navLinkTitle?: string
}