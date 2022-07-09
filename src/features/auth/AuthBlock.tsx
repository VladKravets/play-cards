import React, { FC } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { useAppSelector } from '../../main/bll/store'
import FlyingRocket from '../../main/ui/common/FlyingRocket/FlyingRocket'
import { MainLogo } from '../../main/ui/common/MainLogo/MainLogo'
import { PATH } from '../../utils/path'
import s from './AuthBlock.module.css'

/** Authorization block common template (set different props and different forms as children) */
const AuthBlock: FC<AuthBlockPropsType> = ({
pageTitle, children, navBlockLabel, navLinkPath, navLinkTitle, withRocket }) => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    const withNavBlock = (navLinkPath && navLinkTitle)

    let rocketPositionCN
    switch(withRocket) {
        case 'left': {
            rocketPositionCN = s.rocketBoxLeft
            break
        }
        case 'right': {
            rocketPositionCN = s.rocketBoxRight
            break
        }
        default: rocketPositionCN = ''
    }


	if (isLoggedIn) return <Navigate to={PATH.profile}/>

    return (
        <div className={s.wrapper}>
            <div className={`${s.authBlock} ${rocketPositionCN}`}>
                <div className={s.authBox}>
                    <MainLogo className={s.mainLogo} />
                    <h1 className={s.pageTitle}>
                        {pageTitle}
                    </h1>

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

                {withRocket
                    && <div className={s.rocketBox}>
                        <FlyingRocket />
                    </div>
                }
            </div>
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
    /**
     * Show/hide block with animated rocket
     */
    withRocket?: "left" | "right"
}