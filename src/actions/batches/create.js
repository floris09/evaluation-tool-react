// src/actions/batches/create.js
import { push } from 'react-router-redux'

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
export const BATCH_CREATED = 'BATCH_CREATED'

const api = new API()

export default (body) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    console.log(body)
    api.post('/batches', {...body})
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: BATCH_CREATED,
          payload: result.body
        })

        dispatch(push('/'))
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
