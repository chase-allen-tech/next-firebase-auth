import Head from "next/head";
import { useRouter } from "next/router";

const Menu = ({ id }) => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <Head>
        <title>{id}</title>
      </Head>
      <p>{pid}</p>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const {
    params: { id },
  } = ctx;
  return {
    props: { id },
  };
}

export default Menu;
