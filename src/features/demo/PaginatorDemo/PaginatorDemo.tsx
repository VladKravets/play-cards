import React, { useState } from 'react'
import Paginator from '../../../main/ui/common/Paginator/Paginator'

const PaginatorDemo = () => {
    const TOTAL_ITEMS_COUNT = 500
    const PAGE_SIZE = 10

    const [currentPage, setCurrentPage] = useState(1)

    const pageSelectHandler = (pageNum: number) => {
        setCurrentPage(pageNum)
    }

    return (
        <Paginator 
            totalItemsCount={TOTAL_ITEMS_COUNT} 
            pageSize={PAGE_SIZE}
            currentPage={currentPage} 
            onPageSelected={pageSelectHandler}/>
    )
}

export default PaginatorDemo