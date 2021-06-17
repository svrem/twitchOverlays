import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";

const name = () => {
  const router = useRouter();
  const { name: userName } = router.query;

  return <Typography variant="h2">{userName}</Typography>;
};

export default name;
