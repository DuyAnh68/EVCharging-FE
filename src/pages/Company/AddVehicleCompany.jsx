import ContentStep from "../../components/Company/ContentStep";
import Steps from "../../components/Company/Steps/Steps";

const AddVehicleCompany = () => {  
    return (
        <div className="flex flex-col gap-3 p-10 ">
        <div className="flex flex-col items-center mb-10 ">
            {/* <div className="title text-[black] text-4xl font-bold">Logo</div> */}
            <div className="title text-[black] text-4xl font-bold">Đăng ký xe điện</div>
        </div>
        <div className="middle flex flex-1 flex-col items-center justify-center gap-10">
            
              <StepperrProvider>
                <Reset/>
                <Steps/>
                <div className="w-full max-w-5xl mx-auto">
                  <ContentStep/>
                </div>               
              </StepperrProvider>     
        </div>
    </div>

    );
}
export default AddVehicleCompany;