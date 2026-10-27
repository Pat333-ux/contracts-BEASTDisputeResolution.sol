// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title BEASTLandRegistry
 * @notice Manages sovereign land parcels, GeoJSON boundary hashes, and title deeds
 * for BEAST System 3.0.
 * @dev Designed for integration with BEASTSystemBus and civic property management.
 */
contract BEASTLandRegistry {
    struct LandParcel {
        uint256 parcelId;
        address owner;
        string geoJsonHash;
        uint256 assessedValueLUCR;
        bool isDisputed;
        uint256 registrationTimestamp;
    }

    address public governingAuthority;
    uint256 public parcelCounter;

    mapping(uint256 => LandParcel) public parcels;
    mapping(string => uint256) public geoHashToParcelId;

    event ParcelRegistered(uint256 indexed parcelId, address indexed owner, string geoJsonHash);
    event ParcelTransferred(uint256 indexed parcelId, address indexed oldOwner, address indexed newOwner);
    event ParcelAssessmentUpdated(uint256 indexed parcelId, uint256 newAssessment);
    event ParcelDisputeFlagSet(uint256 indexed parcelId, bool isDisputed);

    modifier onlyAuthority() {
        require(msg.sender == governingAuthority, "BEASTLand: Caller is not governing authority");
        _;
    }

    constructor() {
        governingAuthority = msg.sender;
    }

    /**
     * @notice Registers a new land parcel with GeoJSON boundary hash and valuation.
     */
    function registerParcel(
        address parcelOwner,
        string calldata geoJsonHash,
        uint256 assessedValueLUCR
    ) external onlyAuthority returns (uint256) {
        require(parcelOwner != address(0), "BEASTLand: Invalid owner address");
        require(geoHashToParcelId[geoJsonHash] == 0, "BEASTLand: Parcel already registered");

        parcelCounter++;
        uint256 newId = parcelCounter;

        parcels[newId] = LandParcel({
            parcelId: newId,
            owner: parcelOwner,
            geoJsonHash: geoJsonHash,
            assessedValueLUCR: assessedValueLUCR,
            isDisputed: false,
            registrationTimestamp: block.timestamp
        });

        geoHashToParcelId[geoJsonHash] = newId;

        emit ParcelRegistered(newId, parcelOwner, geoJsonHash);
        return newId;
    }

    /**
     * @notice Updates the assessed value of a registered land parcel.
     */
    function updateAssessment(uint256 parcelId, uint256 newAssessment) external onlyAuthority {
        LandParcel storage parcel = parcels[parcelId];
        require(parcel.parcelId != 0, "BEASTLand: Parcel does not exist");

        parcel.assessedValueLUCR = newAssessment;
        emit ParcelAssessmentUpdated(parcelId, newAssessment);
    }

    /**
     * @notice Sets or clears the dispute status on a land parcel.
     */
    function setDisputeStatus(uint256 parcelId, bool status) external onlyAuthority {
        LandParcel storage parcel = parcels[parcelId];
        require(parcel.parcelId != 0, "BEASTLand: Parcel does not exist");

        parcel.isDisputed = status;
        emit ParcelDisputeFlagSet(parcelId, status);
    }
}
