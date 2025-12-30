import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewPaste() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/pastes/${id}`)
      .then((res) => setData(res.data))
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Paste Content</h2>
      <pre>{data.content}</pre>

      <p>
        Remaining Views:{" "}
        {data.remaining_views === null
          ? "Unlimited"
          : data.remaining_views}
      </p>

      <p>
        Expires At:{" "}
        {data.expires_at
          ? new Date(data.expires_at).toLocaleString()
          : "Never"}
      </p>
    </div>
  );
}

export default ViewPaste;
