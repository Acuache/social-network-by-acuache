import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../supabase/supabase.config";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface UseSupabaseSubscriptionProps {
  channelName: string;
  options: {
    event: "*" | "INSERT" | "UPDATE" | "DELETE";
    schema: string;
    table?: string;
    filter?: string;
  };
  queryKey: string[];
}

export const useSupabaseSubscription = ({
  channelName,
  options,
  queryKey
}: UseSupabaseSubscriptionProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscription = supabase
      .channel(channelName)
      .on(
        "postgres_changes" as any,
        options,
        (payload: RealtimePostgresChangesPayload<any>) => {
          const { eventType } = payload;
          if (["INSERT", "UPDATE", "DELETE"].includes(eventType)) {
            queryClient.invalidateQueries({ queryKey });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [channelName, options, queryKey, queryClient]);
};