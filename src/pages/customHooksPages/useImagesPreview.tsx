import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";
import { setAhut } from "../../actions/auth";
import { useEffect } from "react";

export const useImagesPreview = () => {
  const inSession = useSelector((state: any) => state?.app?.user?.token || false);
  const images = useSelector((state: any) => state?.app?.upload || []);
  const token = useSelector((state: StoreType) => state?.app?.user?.token || '');

  useEffect(() => {
    setAhut(token);
  }, [token]);

  return {
    inSession,
    images,
  }
}