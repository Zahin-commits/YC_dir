import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_view_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write_client'
import {after} from 'next/server'

const View = async({id}:{id:string}) => {
    const totalViews = await client.withConfig({useCdn:false}).fetch(STARTUP_view_QUERY,{id});
    const views = totalViews[0]?.views;

  after (async() => {
    await writeClient.patch(id).set({views:views+1}).commit();
  })
    // console.log(totalViews)
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'><Ping/></div>
        <p className="view-text">
            <span className="font-blod">{views} {views <= 1 ?'view':'views'}</span>
        </p>
    </div>
  )
}

export default View