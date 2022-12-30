import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bestSalesState, requestBestSales, resultBestSales } from '../utils/sliceBestSales';
import SkeletonPreviewProduct from '../components/SkeletonPreviewProduct';
import useIntersection from '../hooks/useIntersection';
import PreviewProduct from '../components/PreviewProduct';
import spinnerIcon from '../assets/images/spinnerIcon.webp'
const axios = require("axios");

const InfiniteProducts = () => {
    const bestSalesData = useSelector(bestSalesState);
    const dispatch = useDispatch();

    const [infiniteLoading, setInfiniteLoading] = useState(true);
    const [skeletonLoading, setSkeletonLoading] = useState(true);

    const scrollStopRef = useRef(null);

    const { pathname } = useLocation();

    const renderProducts = (docs) => {
        if (docs.length !== 0){

            if (skeletonLoading === true){
                setSkeletonLoading(false);
            }

            return docs.map((e, index) => (
                <li key={index}>
                    <PreviewProduct data={e} />
                </li>
            ))
        }
    }

    // console.log(useSelector(bestSalesState));

    const fetchBestSales = (pageNum = 1) => {
        const alreadyFetching = bestSalesData.fetching;
        const envKey = process.env.NEWRAPIDAPI_KEY;

        if (alreadyFetching || !envKey){
            return;
        }

        const options = {
            method: 'GET',
            url: 'https://magic-aliexpress1.p.rapidapi.com/api/bestSales/products',
            params: {page: pageNum, priceMax: '30', priceMin: '5', sort: 'EVALUATE_RATE_ASC'},
            headers: {
                'X-RapidAPI-Key': envKey,
                'X-RapidAPI-Host': 'magic-aliexpress1.p.rapidapi.com'
            }
        };

        dispatch( requestBestSales() );

        axios.request(options)
            .then((response) => {
                dispatch( resultBestSales(response.data) );
                setInfiniteLoading(false);
                // console.log("fetchBestSales", response.bestSalesData, bestSalesData);
            })
            .catch((error) => {
                setInfiniteLoading(false);
                console.error(error);
            });
    }

    const scrollPagination = () => {
        setInfiniteLoading(true);

        if (bestSalesData.page !== 0 && bestSalesData.hasNextPage){
            fetchBestSales(bestSalesData.nextPage);
        }
        else {
            setTimeout(() => {
                fetchBestSales()
            }
            , 2000);
        }
    }

    useEffect(() => {
        if (infiniteLoading && !bestSalesData.fetching && bestSalesData.page === 0){
            scrollPagination();
        }
    }, [])

    useEffect(() => {
        if (scrollStopRef.current !== null){
            useIntersection(
                () => {
                    scrollPagination();
                }
            ).observe(scrollStopRef.current);
        }
    }
    , [infiniteLoading]);

    return (
        <section className={`table-cell w-full h-full px-3 ${!infiniteLoading && 'h-[calc(100%+48px)]'} ${pathname === '/' && 'pb-14'} text-base bg-transparent`}>
            {/* <button className='fixed top-[3%] z-30 bg-red-600 text-white' onClick={() => console.log(bestSalesData)}>BestSalesData</button> */}
            <p className={`my-[1.8vh] text-lg  ${pathname !== '/' ? 'text-[4vw] font-bold' : 'text-[4.8vw] font-medium'}`}>More to love</p>
            <ul className='h-full w-full min-h-screen grid grid-cols-2 gap-1.5 overflow-hidden'>
            {!!skeletonLoading && (
                <>
                    <li>
                        <SkeletonPreviewProduct />
                    </li>
                    <li>
                        <SkeletonPreviewProduct />
                    </li>
                    <li>
                        <SkeletonPreviewProduct />
                    </li>
                    <li>
                        <SkeletonPreviewProduct />
                    </li>
                    <li>
                        <SkeletonPreviewProduct />
                    </li>
                    <li>
                        <SkeletonPreviewProduct />
                    </li>
                    <li>
                        <SkeletonPreviewProduct />
                    </li>
                    <li>
                        <SkeletonPreviewProduct />
                    </li>
                </>
            )}
            {renderProducts(bestSalesData.docs)}
            </ul>
            {infiniteLoading && (
                <div className='w-full h-max py-4 text-center'>
                    <img className='inline-block h-10 w-10 animate-spin' src={spinnerIcon} alt='Spin loader image' />
                </div>
            )}
            {!infiniteLoading && (
                <div className='h-0 w-full' onClick={scrollPagination} ref={scrollStopRef} />
            )}
        </section>
    )
}

export default InfiniteProducts;