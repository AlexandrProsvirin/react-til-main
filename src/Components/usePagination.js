import { useMemo } from 'react';

const usePagination = (totalPages) => {
    const pagesArray = useMemo(() => {
        const arr = [];
        for (let i = 1; i <= totalPages; i++) {
            arr.push(i);
        }
        return arr;
    }, [totalPages]);

    return pagesArray;
};

export default usePagination;
