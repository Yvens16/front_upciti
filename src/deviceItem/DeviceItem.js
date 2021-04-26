import React from 'react'
import moment from 'moment'



require('./deviceItem.scss')

function DeviceItem ({ item, customClick, index }) {
  return (
    <div className='device' onClick={customClick} data-testid={`item_${index}`}>
      <div className='device_url'>Url: <span>{item.url}</span></div>
      <div className={'device_status'}>Status: <span className={`${item.status}`}>{item.status}</span></div>
      <div className='device_last_seen_at'>
        Last seen at: <span>{moment(item.last_seen_at).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span>
      </div>
    </div>
  )
}

export default DeviceItem
