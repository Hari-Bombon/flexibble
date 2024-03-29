"use client"
import { useRouter } from "next/navigation"
import Button from './Button';



type Props = {
    startCursor : string;
    endCursor   : string;
    hasPreviousPage : boolean;
    hasNextPage     : boolean;
}

const LoadMore = ({ startCursor , endCursor , hasPreviousPage , hasNextPage}) => {
    const router = useRouter();

    const handleNavigation = (Direction : string) =>{
        const currentParams = new URLSearchParams(window.location.search)
        if(direction === 'next' && hasNextPage){
            currentParams.delete('startcursor')
            currentParams.set('endcursor' , endCursor)
        }else if(direction === 'first' && hasPreviousPage){
            currentParams.delete('endcursor');
            currentParams.set('startcursor', startCursor);
        }

        const newSearchParams = currentParams.toString();
        const newPathname = `${window.location.pathname}?${newSearchParams}`

        router.push(newPathname)
    }
  return (
    <div className="w-full flex-center gap-5 mt-10">
        {hasPreviousPage &&
         <Button title="First Page" handleClick={() => handleNavigation('first')}/>
         }

        {hasNextPage &&
         <Button title="Next Page" handleClick={() => handleNavigation('first')}/>
         }
    </div>
  )
}

export default LoadMore
