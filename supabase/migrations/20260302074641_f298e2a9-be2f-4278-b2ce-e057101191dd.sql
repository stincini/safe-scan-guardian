
-- Table to cache aggregated risk intelligence data
CREATE TABLE public.risk_intelligence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL, -- 'ftc', 'aarp', 'reddit', 'ic3', 'app'
  title TEXT NOT NULL,
  threat_type TEXT,
  risk_level TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high'
  change_percent INTEGER DEFAULT 0,
  signal_count INTEGER DEFAULT 0,
  raw_data JSONB,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.risk_intelligence ENABLE ROW LEVEL SECURITY;

-- Public read access (risk data is non-sensitive aggregate data)
CREATE POLICY "Risk intelligence is publicly readable"
  ON public.risk_intelligence FOR SELECT
  USING (true);

-- Only service role can insert/update (via edge functions)
CREATE POLICY "Service role can manage risk data"
  ON public.risk_intelligence FOR ALL
  USING (auth.role() = 'service_role');

-- Index for fast queries
CREATE INDEX idx_risk_intelligence_source ON public.risk_intelligence(source);
CREATE INDEX idx_risk_intelligence_fetched_at ON public.risk_intelligence(fetched_at DESC);
