import SERVER_URLS from "utils/serversUrls";
import { Button } from "@mui/material";

const { URL_LOGIN } = SERVER_URLS;

const VerifyPage = () => {
  return (
    <>
      <div main-container>
        <main>
          <h1>Su usuario ha sido verificado</h1>
          <Button className={"text-sm text-blue-600"}>
            <a href={URL_LOGIN} className={"text-sm text-blue-600"}>
              Iniciar sesión
            </a>
          </Button>
        </main>
      </div>
    </>
  );
};

export default VerifyPage;
