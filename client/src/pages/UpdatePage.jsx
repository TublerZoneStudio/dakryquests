import React, { useEffect, useContext, useCallback } from 'react'
import {useHttp} from '../hooks/http.hook'
import {useParams} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
import Loader from '../components/UI/Loader/Loader'
import Constructor from './Constructor/Constructor'
import { useTable } from '../context/TableProvider'

const UpdatePage = () => { 
    const {token} = useContext(LoginContext)
    const {request, loading} = useHttp()
    const tableId = useParams().id

    const { configTable, deconfigTable, setUpdateStatus } = useTable()
    
    const getTable = useCallback( async() => {
        try{
            const fetched = await request(`/api/table/${tableId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })

            configTable(fetched.table, fetched)
            setUpdateStatus(true)
        } catch(e) {
            console.log(e)
        }
    }, [tableId, request, configTable, setUpdateStatus, token])
    
    useEffect( () => {
        getTable()

        return () => {
            deconfigTable()
            setUpdateStatus(false)
        }
    }, [getTable, deconfigTable, setUpdateStatus])

    if(loading) return <Loader/>

    return <Constructor/> 
}

export default UpdatePage