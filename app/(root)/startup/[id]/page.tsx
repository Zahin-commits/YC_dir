import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
// export const experimental_ppr = true;

const md = markdownit()

const page = async({params}:{params:Promise<{id:string}>}) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});

    if(!post) return notFound();

    const paresedConetent = md.render(post?.pitch || "")

    // console.log({id});
  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post?.title}</h1>
        <p className="sub-heading max-w-5xl">{post?.description}</p>
      </section>

      <section className='section_container'>
           <img src={post?.image} alt="post image" className='h-auto w-full rounded-xl' />

           <div className='space-y-5 mt-10 max-w-4xl'>
            <div className="flex-between gap-5">
              <Link href={`/user/${post?.author?._id}`} className='flex gap-2 items-center'>
                <Image src={post.author.image} alt='author dp' width={84} height={84} className='rounded-full drop-shadow-lg' />
                <div>
                  <p className="text-20-medium">{post?.author?.name}</p>
                  <p className="text-20-medium !text-black-300">{post?.author?.username}</p>
                </div>
              </Link>

              <p className="post-category">{post?.category}</p>
            </div>

            <h3 className='text-30-bold'>Pitch Details</h3>
            {paresedConetent? (
               <article className='prose break-all' dangerouslySetInnerHTML={{__html:paresedConetent}} />
            ):(<p className='no-result'>No Details Provided</p>)}
           </div>

           <hr className="divider" />

           <Suspense fallback={<Skeleton className='view-skeletion'/>}>
             <View id={id}/>
           </Suspense>
      </section>
    </>
  )
}

export default page