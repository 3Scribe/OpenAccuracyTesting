hms <- function(t){
  hours <- as.integer(t / 3600)
  minutes <- as.integer((t - (hours * 3600)) / 60)
  seconds <- as.integer(t - (hours * 3600) - (minutes * 60))
  
  sprintf("%s%s%s",
          ifelse(hours>0, sprintf("%d %s%s", hours, ifelse(hours>1, "hours", "hour"), ifelse(((minutes>0) & (seconds>0)), ", ", ifelse((((minutes>0) & (seconds==0))||((minutes==0) & (seconds>0))), " and ", ""))), ""),
          ifelse(minutes>0, sprintf("%d %s%s", minutes, ifelse(minutes>1, "minutes", "minute"), ifelse(seconds>0, " and ", "")), ""),
          ifelse(seconds>0, sprintf("%d %s", seconds, ifelse(seconds>1, "seconds", "second")), "")
  )
}