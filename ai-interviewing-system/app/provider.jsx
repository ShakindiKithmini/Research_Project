"use client";
import { supabase } from "@/services/superbaseClient";
import React, { useEffect, useState, useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let subscription = null;

    const init = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) await upsertUser(authUser);

      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const currentUser = session?.user ?? null;
        if (currentUser) await upsertUser(currentUser);
        else setUser(null);
      });

      subscription = authSubscription;
    };

    init();

    return () => {
      try {
        if (subscription && typeof subscription.unsubscribe === "function") {
          subscription.unsubscribe();
        }
      } catch (e) {
        // ignore unsubscribe errors
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upsertUser = async (authUser) => {
    try {
      if (!authUser?.email) return;

      const { data: existing, error: selectError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", authUser.email)
        .limit(1);

      if (selectError) {
        console.error("Error checking Users table:", selectError);
        return;
      }

      if (!existing || existing.length === 0) {
        const { data: inserted, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: authUser.user_metadata?.name ?? null,
              email: authUser.email,
              picture: authUser.user_metadata?.picture ?? null,
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Error inserting user:", insertError);
          return;
        }

        setUser(inserted);
      } else {
        setUser(existing[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
