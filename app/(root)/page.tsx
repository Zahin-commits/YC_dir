import React from 'react'
import SearchForm from '../../components/SearchForm'
import StartupCard, { StartupCardType } from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { SanityLive } from '@/sanity/lib/live';

export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  const query = (await searchParams).query;
  const params = {search: query || null}

  const posts = await client.fetch(STARTUPS_QUERY, params);
  // const {data:posts} = await client.fetch(STARTUPS_QUERY)

  // console.log(JSON.stringify(posts,null,2));

  const posts2 = [{
    _createdAt: new Date(),
    views: 43,
    author:{_id:1, name:'Zahin'},
    _id:1,
    description:'This is a description',
    image:'https://images.unsplash.com/photo-1734004902532-be79323e70cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
    category:'Robots',
    title:'this is a title'
  }]
  return (
    <>
    <section className='pink_container'>
        <h1 className='heading'>Pitch your startup, <br />connect with entrpreneures</h1>

        <p className='sub-heading !max-w-3xl'>
          Submit Ideas,Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query}/>
    </section>
     
     <section className='section_container'>
       <p className='text-30-semibold'>
        {query ? `Search results for ${query}`: 'All Startups'}
       </p>

       <ul className="card_grid">
          {posts.length > 0? (
            posts.map((post:StartupCardType)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ):(<p className='no-results'>No startups found</p>)}
       </ul>
     </section>
     <SanityLive/>
    </>
  )
}
