-- CreateTable
CREATE TABLE "Gpu" (
    "id" SERIAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,
    "architecture" TEXT NOT NULL,
    "memory_size" INTEGER NOT NULL,
    "memory_type" TEXT NOT NULL,
    "core_clock" INTEGER NOT NULL,
    "boost_clock" INTEGER NOT NULL,
    "cuda_cores" INTEGER NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);
