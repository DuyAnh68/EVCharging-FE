import { useState } from "react";
import subscriptionListApi from "../api/subscriptionListApi";

const useSubscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [subscriptionId, setSubscriptionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSubscriptions = async () => {
        setLoading(true);
        setError(null);

        try{
            const response = await subscriptionListApi.getSubscriptions();
            if(response){
                setSubscriptions(response.result);
                setLoading(false);
                return response.result;
            }
        }catch (e) {
            setError(e.message);
            return e.message;
        }finally{
            setLoading(false);
        }
    };

    const getSubscriptionById = async (subscriptionId) => {
        setLoading(true);
        setError(null);

        try{
            const response = await subscriptionListApi.getSubscriptionById(subscriptionId);
            if(response){
                setSubscriptionId(response.result);
                setLoading(false);
                return response.result
            }
        }catch (e) {
            setError(e.message);
            return e.message;
        }finally{
            setLoading(false)
        }
    };

    return {
        loading,
        error,
        subscriptionId,
        subscriptions,
        getSubscriptions,
        getSubscriptionById,
    };
};

export default useSubscription;
