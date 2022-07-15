import React, { FC } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { useAppSelector } from '../../main/bll/store'
import { FlatProgress } from '../../main/ui/common/FlatProgress/FlatProgress'
import FlyingRocket from '../../main/ui/common/FlyingRocket/FlyingRocket'
import { MainLogo } from '../../main/ui/common/MainLogo/MainLogo'
import { PATH } from '../../utils/path'
import s from './AuthBlock.module.css'


/** Authorization block common template (set different props and different forms as children) */
export const AuthBlock: FC<AuthBlockPropsType> = React.memo( 
({
    pageTitle, children, navBlockLabel, navLinkPath,
    navLinkTitle, withRocket, isLoading 
}) => {

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


	if (isLoggedIn) return <Navigate to={PATH.about}/>

    return (
        <div className={s.wrapper}>
            <div className={`${s.authBlock} ${rocketPositionCN}`}>
                <div className={s.authBox}>
                    <MainLogo size={22} className={s.mainLogo} />
                    <h1 className={s.pageTitle}>
                        {pageTitle}
                    </h1>

                    {children}

                    
                    <AuthBlockProgressbar isLoading={isLoading} />

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
})

const AuthBlockProgressbar = React.memo( ({isLoading}: {isLoading: boolean | undefined}) => {
    return (
        <div className={s.flatProgressbar}>
            {isLoading
                ? <FlatProgress isLoading={isLoading} withColoredLine/>
                : <div className={s.hiddenStub}></div>
            }
        </div>
    )
})


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
    isLoading?: boolean
}