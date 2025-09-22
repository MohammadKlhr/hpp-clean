import { RequestHandler } from 'express';

interface HppOptions {
  whitelist?: string[];
  keepFirst?: boolean;
}

declare function hppClean(options?: HppOptions): RequestHandler;

export = hppClean;
