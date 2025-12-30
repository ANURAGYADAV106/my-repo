import { useState } from "react";
import axios from "axios";

function CreatePaste() {
  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState("none");









  // dssgg
  const submit = async () => {
    let ttl_seconds = null;

    if (expiry === "5m") ttl_seconds = 5 * 60;
    if (expiry === "30m") ttl_seconds = 30 * 60;
    if (expiry === "1h") ttl_seconds = 60 * 60;
    if (expiry === "1d") ttl_seconds = 24 * 60 * 60;

    const res = await axios.post("http://localhost:4000/api/pastes", {
      content,
      ttl_seconds
    });

    alert(res.data.url);
  };

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col  justify-center items-center  ">
        <div className=" h-fit bg-blue-600 p-4  rounded-lg">
        <div className="flex  justify-center items-center rounded-lg   ">
      <form >
        <input type="text"
        placeholder="Enter your paste"
        onChange={(e) => setContent(e.target.value)}
        className=" border  border-white"
        />
      </form>
        </div>
     <div className=" flex justify-between gap-5 p-5">

     <div>
        <select onChange={(e) => setExpiry(e.target.value)}>
        <option value="none">Never expire</option>
        <option value="5m">5 Minutes</option>
        <option value="30m">30 Minutes</option>
        <option value="1h">1 Hour</option>
        <option value="1d">1 Day</option>
      </select>

     </div>
      
    
        <div>
         <button className=" bg-green-900 rounded-lg text-white" onClick={submit}>Create Paste</button>   
        </div>
      
    </div>
    </div>
    </div>
  );
}

export default CreatePaste;
