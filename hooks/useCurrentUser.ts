//swr -> Quando você está scrollando comentários, clica em algum deles para ver novos detalhes, mas depois você quer voltar a scrollar,
//você quer voltar a scrollar de onde parou e não quer ficar tendo que passar por todos novamente, o SWR é responsável por armazenar no cache onde você parou.
//por baixo dos panos, eles verifica no CACHE  se existe uma cópia de uma requisição Web nele, se não exister ele cria, se já existe, ele só verifica se existe algo novo,
// e retorna pra você a requisição onde estava.
// essa biblioteca é usada somente pra experiencia de usuáiro.
import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;

