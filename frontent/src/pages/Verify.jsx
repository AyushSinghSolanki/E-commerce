import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const success = searchParams.get("success");

    if (success === "true") {
      navigate("/order");
    } else {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      Verifying Payment...
    </div>
  );
};

export default Verify;
