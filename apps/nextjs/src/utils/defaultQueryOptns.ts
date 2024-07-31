import { keepPreviousData } from "@tanstack/react-query";

export const defaultDataQueryOptns = {
  placeholderData: keepPreviousData,
  refetchOnWindowFocus: false,
  retry: false,
};

export const defaultCountQueryOptns = {
  placeholderData: keepPreviousData,
  refetchOnWindowFocus: false,
  retry: false,
};
