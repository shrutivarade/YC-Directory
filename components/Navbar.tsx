import Image from "next/image";
import Link from 'next/link';
import {auth, signIn, signOut} from "@/auth";

const Navbar = async () => {

    const  session = await auth();

    return (
        <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
            <nav className=" flex justify-between items-center">
                <Link href="/public">
                    <Image src="/logo.png" alt="logo" width={144} height={30}/>

                </Link>
                <div className="flex items-center gap-5 text-black">
                {/* Inside this we only want to render thing if the user is logged in */}
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <button type='submit'> Create </button>
                            </Link>
                            {/*<button onClick={signOut}>*/}
                            {/*    <span> Logout </span>*/}
                            {/*</button>*/}

                            <form action={async () => {
                                'use server'
                                await signOut({redirectTo: "/"})
                            }}>
                                <button type='submit'> Logout </button>
                            </form>

                            <Link href="/user/${session?.id}">
                                <span> {session?.user?.name} </span>
                            </Link>

                        </>
                    ) : (
                        // Even this way works for me. As in rendering server component
                        // inside a client component with onclick event

                        // <button onClick={ async () => {
                        //     'use server';
                        //     await signIn('github')
                        // }}>
                        //     <span> Login </span>
                        // </button>


                        <form action={ async () => {
                                'use server';
                                await signIn('github')
                            }}>
                            <button type='submit'> Login </button>
                        </form>
                    )
                    }


                </div>



            </nav>

        </header>

    )
}
export default Navbar
