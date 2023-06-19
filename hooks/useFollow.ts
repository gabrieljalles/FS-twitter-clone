import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);

    }, [userId, currentUser?.followingIds]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId } }) //como o body deve ser aceito e envia ele, necessário para delete
            } else {
                request = () => axios.post('/api/follow', { userId }); //apenas envia o body, não precisa do como, post
            }

            await request;

            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Success');
        } catch (error) {
            console.log(error);
            toast.error('something went wrong');
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return {
        isFollowing,
        toggleFollow,
    }
}

export default useFollow;