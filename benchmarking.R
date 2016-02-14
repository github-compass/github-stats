
library(microbenchmark)
library(dplyr)
library(jsonlite)
library(profvis)
library(ggplot2)
process_files <- function() {

  return(all_common)
}

profvis({
  file_list <- normalizePath(list.files("prior_responses/dpastoor-100-paginated", full.names = T))
  all_data <- data.frame()
  for (file in file_list) {
    if (!nrow(all_data)) {
      all_data <- fromJSON(file) 
    } else {
      temp <- fromJSON(file)
      all_data <- bind_rows(all_data, temp)
    }
  }
  indexed <- all_data %>% group_by(login) 
  tallied <- indexed %>% tally 
  filtered <- tallied %>% filter(n > 4)
})
microbenchmark(process_files(), times=5L)
