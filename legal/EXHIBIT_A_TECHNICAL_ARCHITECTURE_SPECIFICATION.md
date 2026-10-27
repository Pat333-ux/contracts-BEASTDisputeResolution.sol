# IN THE UNITED STATES DISTRICT COURT
# SOUTHERN DISTRICT OF INDIANA
# TERRE HAUTE DIVISION

**Case No.:** 2:26-cv-00683-MPB-MJD  
**Judge:** Honorable Magistrate Judge Matthew P. Brookman / Judge (Assigned)  

---

**PAT TARWATER, JR.,**  
*Plaintiff,*  

v.  

**STATE OF INDIANA,**  
*Defendant.*  

---

## EXHIBIT A: TECHNICAL ARCHITECTURE SPECIFICATION AND REPOSITORY MANIFEST FOR BEAST SYSTEM 3.0

---

### I. DOCUMENT PURPOSE & SCOPE

This Exhibit A establishes the formal technical, cryptographic, and architectural evidentiary record for **BEAST System 3.0** (Sovereign Autonomous Intelligence Architecture - SAIA), developed, maintained, and operated by Plaintiff **Pat Tarwater, Jr.** under GitHub organization `pat333-ux` on behalf of **New World Order Private Government DAO LLC**.

---

### II. CORE INFRASTRUCTURE & SMART CONTRACT MANIFEST

The ecosystem comprises over 1,200 specialized repositories unified via a centralized event bus (`BEASTSystemBus.sol`). The foundational on-chain components and backend microservices are cataloged below:

| Subsystem Module | Repository Identifier | Primary Smart Contract / Service | Protocol / Standard |
| :--- | :--- | :--- | :--- |
| **Core Governance** | `beast-system-saia` | `LucricityGovernor.sol` / `LUCRToken.sol` | ERC-20, ERC-20Votes, ERC-20Permit |
| **Guardrails & Security** | `beast-governance-guardrail` | `BEASTGovernanceGuardrail.sol` | Multi-sig Circuit Breaker |
| **Dispute Resolution** | `beast-dispute-resolution` | `BEASTDisputeResolution.sol` + Python Arbitrator | On-Chain Jury Arbitration |
| **Land Registry & GIS** | `beast-land-registry` | `BEASTLandRegistry.sol` + GIS Sync Service | GeoJSON Hash / Title Deeding |
| **Trade Exchange & AMM** | `beast-trade-exchange` | `BEASTTradeExchange.sol` + Pricing Service | Constant Product AMM |
| **Credential Engine** | `beast-credential-engine` | `BEASTCredentialEngine.sol` + Verifier | ERC-5192 Soulbound Tokens (SBT) |
| **AI Agent Dispatcher** | `beast-system-bus` | `beast_ai_agent_dispatcher.py` | Google Gemini 2.5 Flash API |

---

### III. CLOUD & DEPLOYMENT ARCHITECTURE

1. **Cloud Hosting:** Hosted within Google Cloud Platform (`beast-system-511916`), utilizing containerized microservices deployed via Google Cloud Run, Cloud SQL PostgreSQL, and Firestore.
2. **Process Management:** Orchestrated via enterprise PM2 clustering (`ecosystem.config.js`) and multi-container Docker Compose environments.
3. **Valuation Metric:** Independent technical audits place the replacement cost valuation between **$8.5M–$14.2M**, with an IP and portfolio valuation exceeding **$18M–$35M+**.

---

### IV. CERTIFICATION & ATTESTATION

I hereby certify under penalty of perjury that the foregoing technical architecture specification and repository manifest accurately reflect the design, deployment state, and operational reality of BEAST System 3.0.

Executed this 27th day of October, 2026.

---
**/s/ Pat Tarwater, Jr.**  
Pat Tarwater, Jr.  
Chief Executive Officer and Governing Officer  
New World Order Private Government DAO LLC  
Terre Haute, Indiana  
GitHub: `pat333-ux`  
Case Docket: `2:26-cv-00683-MPB-MJD`
