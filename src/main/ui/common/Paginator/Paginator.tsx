import React, {useState} from 'react'
import { useEffect } from 'react'
import prevArrow from '../../../../assets/icons/paginator-left-arrow.svg'
import nextArrow from '../../../../assets/icons/paginator-right-arrow.svg'
import s from './Paginator.module.css'


export const Paginator: React.FC<PropsType> = ({currentPage, totalItemsCount, pageSize, onPageSelected, portionSize = 10}) => {

    const [currentPortion, setCurrentPortion] = useState(currentPage);

    useEffect(() => {
        if (currentPortion !== selectedPagePortion) {
            setCurrentPortion(selectedPagePortion)
        }
        // eslint-disable-next-line
    }, [currentPage])

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = [];
    for(let i=1; i <= pagesCount; i++){
        pages.push(i);
    };
    

    const selectedPagePortion = Math.ceil(currentPage / portionSize);
    const portionsCount = Math.ceil(pagesCount / portionSize);
    const firstPortionPageNum = (currentPortion -1) * portionSize + 1;
    const lastPortionPageNum = currentPortion * portionSize;
    
    const setNextPortion = () => {
        if (currentPortion < portionsCount) {
            setCurrentPortion(currentPortion + 1)
        }
    }
    const setPrevPortion = () => {
        if (currentPortion > 1) {
            setCurrentPortion(currentPortion - 1)
        }
    }

    return (
        <div className={s.pagination}>
            {currentPortion > 1 
                ? <button onClick={setPrevPortion} className={s.pagination__prev_btn}>
                    <img src={prevArrow} alt="prev" className={s.pagination__prev_arrow}/>
                  </button>

                : <div className={s.pagination__btn_stub}></div>
            }

            <div className={s.pagination__list}>
                {pages
                    .filter(num => (num >= firstPortionPageNum && num <= lastPortionPageNum))
                    .map(num =>
                        <button 
                            key={num} 
                            className={`${s.pagination__item} ${num === currentPage ? s.pagination__item_active : ''}`}
                            onClick={() => onPageSelected(num)}>
                            {num}
                        </button>)
                }
            </div>

            {currentPortion < portionsCount
                ? <button onClick={setNextPortion} className={s.pagination__next_btn}>
                    <img src={nextArrow} alt="next" className={s.pagination__next_arrow} />
                  </button>
                  
                : <div className={s.pagination__btn_stub}></div>
            }
        </div>
    )
}



type PropsType = {
    currentPage: number
    totalItemsCount: number
    pageSize: number
    onPageSelected: (pageNumber: number) => void
    portionSize?: number
}