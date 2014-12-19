setwd("/Users/pavel/Desktop/server/world")
i2 <- read.table("i2.tsv", sep = "\t", quote = "", header = FALSE)
i2$V3 <- as.numeric(gsub(",","", i2$V3))
i2$V1 <- NULL

p2 <- read.table("p2.tsv", sep = "\t", quote = "", header = FALSE)
p2$V3 <- as.numeric(gsub(",","", p2$V3))
p2$V1 <- NULL

pi <- merge(i2, p2, by = "V2", all = TRUE)
pi$P <- pi$V3.x / pi$V3.y
pi$V3.x <- pi$V3.y <- NULL

write.table(pi, file='data4.tsv', quote=FALSE, sep='\t', col.names = FALSE)