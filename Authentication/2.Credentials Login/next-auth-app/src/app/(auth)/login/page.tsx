import LoginForm from "@/components/auth/login-form";
import ThirdPartLogin from "@/components/auth/third-party-login";

export default function Home() {
  return (
    <section className="relative w-full h-[calc(100lvh-70px)]">
        <div className="absolute top-0 left-0 w-full h-[calc(100lvh-70px)] object-cover lg:bg-center bg-gray-900" style={{backgroundImage: "url('/background2.jpg')", backgroundSize: "100%", backgroundRepeat: "no-repeat"}}></div>

        <div className="container mx-auto px-4 pt-14 h-[calc(100lvh-70px)]">
            <div className="flex content-center items-center justify-center">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-gray-600 text-sm font-bold">Login with</h6></div>
                            <div className="btn-wrapper text-center">
                                <ThirdPartLogin />
                            </div>
                            <hr className="mt-6 border-b-1 border-gray-400" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="text-gray-500 text-center mb-3 font-bold"><small>Or sign in with credentials</small></div>
                            <LoginForm />
                        </div>
                    </div>
                    <div className="relative flex flex-wrap mt-6">
                        <div className="w-1/2"><a href="#pablo" className="text-gray-700"><small>Forgot password?</small></a></div>
                        <div className="w-1/2 text-right"><a href="#pablo" className="text-gray-700"><small>Create new account</small></a></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
