import { auth } from '@/auth';
import { Session } from 'next-auth';

const HomePage = async() => {
    const session:Session | null = await auth();
    return (
        <div className="text-center font-semibold text-2xl text-gray-600 mt-10">Welcome back { session?.user?.name }</div>
    )
}

export default HomePage